import React, {Component} from 'react';
import './Auth.sass'
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";

class Auth extends Component {

  handlerLogin = () => {};

  handlerRegister = () => {};

  hundlerSubmit = e => {
    e.preventDefault();
  };

  render() {
    return (
      <div className="Auth">
        <div className="Auth__Wrap">
          <h1 className="Auth__Title">Аворизация</h1>
          <form onSubmit={this.hundlerSubmit} className="Auth__Form">
            <Input
              label="Email"
              errorMessage={"dsdsd"}
            />
            <Input
              label="Пароль"

            />
            <div className="Auth__Actions">
              <Button customClass="Success" onClick={this.handlerLogin}>
                Войти
              </Button>
              <Button customClass="Primary" onClick={this.handlerRegister}>
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
