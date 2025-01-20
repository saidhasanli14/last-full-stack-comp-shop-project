package az.developia.comp_shop_said_hasanli.controller;

import org.springframework.validation.BindingResult;

public class MyRuntimeException extends RuntimeException {
  public MyRuntimeException(BindingResult result) {
    super("Validation failed: " + result.toString());
  }

  public MyRuntimeException(Throwable cause) {
    super(cause);
  }
}