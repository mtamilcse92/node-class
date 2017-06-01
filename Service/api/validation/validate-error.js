const errorMappers = {
	name: 'name must be alphanumeric'
};

	const getRegexErrorMessage = (errorMessage) => {
		for (const key in errorMappers) {
		    if (errorMessage.substr(0, errorMessage.indexOf(' ')) === key) {
		        return errorMappers[key];
		    }
		}
		return errorMessage;
	}

	const getErrorMessage = (err) => {
	    if (err && err.errors !== undefined) {
	        const errors = err.errors[0];
	        if (errors && errors.messages[0] !== undefined) {
	            let errorMessage = errors.messages[0].replace(/"/g, '');
	            // this will replace array fields in error messages like ufIds.1 to ufIds[1] for more readability
	            if (errors.types[0] === 'number.base' || errors.types[0] === 'number.positive') {
	                const fieldSplit = errors.field.split('.');
	                errorMessage = errorMessage.replace(fieldSplit[1], `${fieldSplit[0]}[${fieldSplit[1]}]`);
	            } else if (errors.types[0] === 'string.regex.base') {
	                errorMessage = getRegexErrorMessage(errorMessage);
	            }
	            return errorMessage;
	        }
	    }
	    return err;
	}
export default getErrorMessage;