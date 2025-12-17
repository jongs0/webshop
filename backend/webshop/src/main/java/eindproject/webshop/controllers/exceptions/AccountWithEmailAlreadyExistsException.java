package eindproject.webshop.controllers.exceptions;

public class AccountWithEmailAlreadyExistsException extends RuntimeException {
    public AccountWithEmailAlreadyExistsException(String message) {
        super(message);
    }
}
