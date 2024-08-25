const express = require('express');
const jsontoken = require('jsonwebtoken');
const cors = require('cors');
const {sequelize, User, MenuItem} = require('./models');
const {authToken, checkAdminRules} = require('./middleware');

const port = process.env.VITE_BACKEND_PORT;

const app = express();

app.use(cors());
app.use(express.json());

// ---------------------------------------------------------------- Авторизация

app.post('/api/login', async (req, res) => {
  const {username, password} = req.body;

  const user = await User.findOne({where: {username}});

  if (!user){
    return res.status(401).json({ message: 'Неверное имя пользователя' });
  }

  if (password !== user.password){
    return res.status(401).json({message: 'Неверные данные учетной записи'});
  }

  const token = jsontoken.sign({id: user.id}, 'secret-key');
  const rules = user.rules;
  const userId = user.id;
  res.json({token, rules, userId});
});

app.get('/api/rules', async (req, res) => {
  try {
    const userId = req.query.userId; // Получаем userId из query параметров
    if (!userId) {
      return res.status(400).json({ message: 'userId не указан' });
    }
    
    const user = await User.findOne({ where: { id: userId } });
    
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    res.json({ rules: user.rules });
  } catch (err) {
    res.status(400).json({ message: 'Ошибка при получении правил' });
  }
});

// ---------------------------------------------------------------- Работа меню

app.get('/api/menu', async (req, res) => {
  const menuItems = await MenuItem.findAll();
  res.json(menuItems);
});

app.post('/api/menu', authToken, async (req, res) => {
  try{
    const {parent_id, title, content, link} = req.body;
    const newMenuItem = await MenuItem.create({parent_id, title, content, link});
    res.json(newMenuItem);
  }
  catch(err){
    res.status(400).json({message: 'Неверные данные'});
  }
});

app.put('/api/menu/:id', authToken, checkAdminRules, async (req, res) => {
  try{
    const {id} = req.params;
    const {parent_id, title, content, link} = req.body;
    const menuItem = await MenuItem.findByPk(id);
    if(!menuItem) return res.status(404).json({message: 'Нет такого пункта меню'});
    await menuItem.update({parent_id, title, content, link});
    const menuItems = await MenuItem.findAll();
    res.json(menuItems);
  }
  catch(err){
    res.status(400).json({message: 'Неверные данные'});
  }
});

app.delete('/api/menu/:id', authToken, async (req, res) => {
  try{
    const {id} = req.params;
    const menuItem = await MenuItem.findByPk(id);
    if(!menuItem) return res.status(404).json({message: 'Нет такого пункта меню'});
    await menuItem.destroy();
    res.json({message: 'Пункт меню был удален'});
  }
  catch(err){
    res.status(400).json({message: 'Ошибка при удалении'});
  }

});




app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});