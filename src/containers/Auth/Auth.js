import React, {Component} from 'react';
import './Auth.sass'
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";

const validateEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

class Auth extends Component {

  state = {
    isFromValid: "false",
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Введите корректный email',
        valid: false,
        touched: false,
        validationRules: {
          required: true,
          minLength: null,
          email: true
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Пароль',
        errorMessage: 'Введите корректный пароль',
        valid: false,
        touched: false,
        validationRules: {
          required: true,
          minLength: 6,
          email: null
        }
      },
    }
  };

  handlerLogin = () => {};

  handlerRegister = () => {};

  handlerSubmit = e => {
    e.preventDefault();
  };

  handlerOnChange = (value, controlName) => {

    const formControls = {...this.state.formControls};
    const control = {...formControls[controlName] };

    control.value = value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validationRules);

    //проверка полей на валидность с установкой флага
    let isFromValid = true;
    for(let key in formControls){
      isFromValid = formControls[key].valid && isFromValid;
    }

    formControls[controlName] = control;
    this.setState({
      formControls,
      isFromValid
    })
  };

  validateControl = (value, validationRules) => {
    if(!validationRules) return true;
    let isValid = true;

    if(validationRules.required){
      isValid = value.trim() !== '' && isValid;
    };

    if(validationRules.email) {
      isValid = validateEmail(value) && isValid;
    };

    if(validationRules.minLength) {
      isValid = value.length >= validationRules.minLength && isValid;
    };

    return isValid;
  };

  render() {
    const {formControls: {email, password}, isFromValid} = this.state;
    return (
      <div className="Auth">
        <div className="Auth__Wrap">
          <h1 className="Auth__Title">Аворизация</h1>
          <form onSubmit={this.handlerSubmit} className="Auth__Form">
            <Input
              type={email.type}
              value={email.value}
              valid={email.valid}
              touched={email.touched}
              label={email.label}
              onChange={(e) => this.handlerOnChange(e.target.value, email.type)}
              shouldValidate={true}
              errorMessage={email.errorMessage}
            />
            <Input
              type={password.type}
              label={password.label}
              value={password.value}
              onChange={(e) => this.handlerOnChange(e.target.value, password.type)}
              touched={password.touched}
              errorMessage={password.errorMessage}
              valid={password.valid}
              shouldValidate={true}
            />
            <div className="Auth__Actions">
              <Button
                customClass="Success"
                onClick={this.handlerLogin}
                disabled={!isFromValid ? 'disabled': ''}
              >
                Войти
              </Button>
              <Button
                customClass="Primary"
                onClick={this.handlerRegister}
                disabled={!isFromValid ? 'disabled': ''}
              >
                Зарегистрироваться
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Auth;
