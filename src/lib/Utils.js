
/**
 * @summary Module with static methods used as global
 * @method debounce Pattern to avoid multiple instant executions, 100ms as default threshold
 */
const Utils =  {    
    debounce: function(func, wait = 100) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(this, args);
            }, wait);
        };
    }
 
}

export default Utils;