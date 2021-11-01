package com.swqualityboard.configuration;

import java.util.Date;

public class ValidationCheck {
    public static boolean isValid(String value) {
        return (value != null && !value.isEmpty());
    }

    public static boolean isValidId(int id) {
        return (id > 0);
    }

    public static boolean isValidScore(double score) {
        return (score > 0 && score <= 5);
    }

    public static boolean isValidPage(int page) {
        return (page >= 0);
    }

    public static boolean isValidDate(Date date) {
        return (date != null);
    }
}
