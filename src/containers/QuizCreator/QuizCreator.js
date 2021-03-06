import React, {Component} from 'react';
import './QuizCreator.sass';
import Button from "../../components/UI/Button/Button";
import { createControl, validate, validateForm } from '../../form/formFramework';
import Input from "../../components/UI/Input/Input";
import Select from "../../components/UI/Select/Select";
import { connect } from 'react-redux';
import { createQuizQuestion, finishCreateQuiz } from '../../store/actions/create';

function createFormControls(){
  return {
    question: createControl({
      label: 'Введите вопрос',
      errorMessage: 'Вопрос не может быть пустым',
    }, {required: true}),
    option1: createControl({
      label: 'Вариант 1',
      errorMessage: 'Значение не может быть пустым',
      id: 1,
    }, {required: true}),
    option2: createControl({
      label: 'Вариант 2',
      errorMessage: 'Значение не может быть пустым',
      id: 2,
    }, {required: true}),
    option3: createControl({
      label: 'Вариант 3',
      errorMessage: 'Значение не может быть пустым',
      id: 3,
    }, {required: true}),
    option4: createControl({
      label: 'Вариант 4',
      errorMessage: 'Значение не может быть пустым',
      id: 4,
    }, {required: true}),
  }
}

class QuizCreator extends Component {

  state = {
    rightAnswerId: 1,
    isFormValid: false,
    formControls: createFormControls()
  };


  handleSubmit = e => {
    e.preventDefault();
  };

  handlerAddQuestion = (e) => {
    e.preventDefault();
    const { createQuizQuestion } = this.props;
    const {formControls: {question, option1, option2, option3, option4}, rightAnswerId} = this.state;
    const quiz = [ ...this.props.quiz];
    const quizIndex = quiz.length + 1;

    const questionItem = {
      id: quizIndex,
      question: question.value,
      rightAnswerId,
      answers: [
        { text: option1.value, id: option1.id },
        { text: option2.value, id: option2.id },
        { text: option3.value, id: option3.id },
        { text: option4.value, id: option4.id },
      ]
    };

    createQuizQuestion(questionItem);

    this.setState({
      rightAnswerId: 1,
      isFormValid: false,
      formControls: createFormControls()
    })
  };

  handlerCreateQuestion = () => {
    const { finishCreateQuiz } = this.props;

    finishCreateQuiz();

    this.setState({
      rightAnswerId: 1,
      isFormValid: false,
      formControls: createFormControls()
    })

  };

  renderInputs = () => {
    const { formControls } = this.state;

    return  Object.keys(formControls).map((controlName, index) => {
      const currentControl = formControls[controlName];
      return (
        <div key={index}>
          <Input
            label={currentControl.label}
            value={currentControl.value}
            valid={currentControl.valid}
            shouldValidate={!!currentControl.validation}
            touched={currentControl.touched}
            errorMessage={currentControl.errorMessage}
            onChange={e => this.handlerChangeInput(e.target.value, controlName)}
          />
          { index === 0 && <hr/> }
        </div>
      )
    })
  };

  handlerChangeInput = (value, controlName) => {
    const { formControls } = this.state;
    const currentControl = formControls[controlName];

    currentControl.touched = true;
    currentControl.value = value;
    currentControl.valid = validate(currentControl.value, currentControl.validation);

    formControls[controlName] = currentControl;

    this.setState({
      formControls: formControls,
      isFormValid: validateForm(formControls),
    })
  };

  handlerSelectChange = (value) => {
    this.setState({rightAnswerId: value})
  };


  render() {
    const { rightAnswerId } = this.state;
    const { quiz } = this.props;

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
              this.renderInputs()
            }
            <Select
              label={"Выберите правильный объект"}
              value={rightAnswerId}
              onChange={this.handlerSelectChange}
              options={[
                {text: '1', value: 1},
                {text: '2', value: 2},
                {text: '3', value: 3},
                {text: '4', value: 4},
              ]}
            />
            <hr/>
            <div className="QuizCreator__Actions">
              <Button
                customClass="Primary"
                onClick={this.handlerAddQuestion}
                disabled={!this.state.isFormValid}
              >
                Добавить вопрос
              </Button>
              <Button
                customClass="Success"
                onClick={this.handlerCreateQuestion}
                disabled={quiz.length === 0}
              >
                Создать тест
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    quiz: state.create.quiz
  }
};

const mapDispatchToProps = dispatch => {
  return {
    createQuizQuestion: (item) => dispatch(createQuizQuestion(item)),
    finishCreateQuiz: () => dispatch(finishCreateQuiz())
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizCreator);
