const validateLoginForm = (formData) => {
    const errors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        errors.email = "Invalid email address.";
    }

    // Password validation
    if (formData.password.length < 6) {
        errors.password = "Password must be at least 6 characters.";
    }

    return errors;
};

const validateRegistration = (formData) => {
    const errors = {};

    if (formData.companyName) {
        // Company Name validation
        if (!formData.companyName) {
            errors.companyName = "Company name is required.";
        }

        // VAT validation
        const vatRegex = /^(BG)?\d{9,10}$/;
        if (!formData.vat) {
            errors.vat = "VAT number is required.";
        } else if (!vatRegex.test(formData.vat)) {
            errors.vat = "Invalid VAT number.";
        }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        errors.email = "Invalid email address.";
    }

    // Password validation
    if (formData.password.length < 6) {
        errors.password = "Password must be at least 6 characters.";
    }

    // Confirm Password validation
    if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = "Passwords do not match.";
    }

    // Terms acceptance validation
    if (!formData.termsAccepted) {
        errors.termsAccepted = "You must accept the terms and conditions.";
    }

    return errors;
};

export { validateLoginForm, validateRegistration };
