export default {
    getItem: function (key) {
        let value
        try {
            value = localStorage.getItem(key)
        } catch (ex) {
            // Prompt error in development environment
            if (__DEV__) {
                console.error('localStorage.getItem Err, ', ex.message)
            }
        } finally {
            return value
        }
    },
    setItem: function (key, value) {
        try {
            // in ios safari mode，directly using localStorage.setItem will lead to an error
            localStorage.setItem(key, value)
        } catch (ex) {
            // Prompt error in development environment
            if (__DEV__) {
                console.error('localStorage.setItem Err, ', ex.message)
            }
        }
    }
}