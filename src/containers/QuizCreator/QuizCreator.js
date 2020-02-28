import React, {Component} from 'react';
import './QuizCreator.sass';
import Button from "../../components/UI/Button/Button";
import { createControl } from '../../form/formFramework';
import Input from "../../components/UI/Input/Input";

function createFormControls(){
  return {
    formControls: {
      question: createControl({
        label: 'Введите вопрос',
        errorMessage: 'Вопрос не может быть пустым'
      }),
      option1: createControl({
        label: 'Вариант 1',
        errorMessage: 'Значение не может быть пустым'
      }, {required: true}),
      option2: createControl({
        label: 'Вариант 2',
        errorMessage: 'Значение не может быть пустым'
      }, {required: true}),
      option3: createControl({
        label: 'Вариант 3',
        errorMessage: 'Значение не может быть пустым'
      }, {required: true}),
      option4: createControl({
        label: 'Вариант 4',
        errorMessage: 'Значение не может быть пустым'
      }, {required: true}),
    }
  }
}

class QuizCreator extends Component {

  state = {
    quiz: [],
    formControls: createFormControls()
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  handlerAddQuestion = () => {};

  handlerCreateQuestion = () => {};

  render() {
    const {formControls} = this.state;
    console.log(formControls, 'formControls');
    return (
      <div className="QuizCreator">
        <div className="QuizCreator__Container">
          <h1 className="QuizCreator__Title">
            Создание теста
          </h1>
          <form
            onSubmit={this.handleSubmit}
            className="QuizCreator__Form"
          >
            {
              <Input

              />
            }
            <select></select>
            <hr/>
            <div className="QuizCreator__Actions">
              <Button
                customClass="Primary"
                onClick={this.handlerAddQuestion}
              >
                Добавить вопрос
              </Button>
              <Button
                customClass="Success"
                onClick={this.handlerCreateQuestion}
              >
                Создать тест
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default QuizCreator;
