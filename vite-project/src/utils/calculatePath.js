function calculatePath(array, itemId) {
    const item = array.find(item => item.id === itemId);
    if(!item) return '/notfound';
    const parentPath = item.parent_id !== null ? calculatePath(array, item.parent_id) : '';    
    return (parentPath + item.link).replace(/\/\//g, '/');
}

export default calculatePath;

