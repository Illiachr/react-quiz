export function createControl(config, validation) {
    return {
        ...config,
        validation,
        valid: !validation,
        touched: false,
        value: ''
    }

} // end createControl

export function validate(value, validation = null) {
    if (!validation) {
        return true
    }

    let isValid = true

    if (validation.validation) {
        isValid = value.trim() !== '' && isValid
    }
} // end validate

export function validateForm(formControls) {
    let isFormValid = true

    for (const control in formControls) {
        if (formControls.hasOwnProperty(control)) {
            isFormValid = formControls[control].valid && isFormValid
        }
    }

    // Object.keys(formControls).map(name => 
    //     isFormValid = formControls[name].valid && isFormValid
    // )
    return isFormValid
}