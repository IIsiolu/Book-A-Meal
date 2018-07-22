import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import swal from 'sweetalert';
import { ToastContainer } from "react-toastr";


let formerState = {}
let container;
class MealOptions extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: {
        id: props.meal.id,
        name: props.meal.name,
        image: props.meal.image,
        price: props.meal.price,
        description: props.meal.description,
      },
      id: props.meal.id,
      edit: false,
      errors: {}
    }
  }
  toast = () => (
    container.error( 'Meal updated Succeccfully', {
      closeButton: true,
    })
  )
  alert = () => (
    swal("Meal Updated", "Your meal has been updated successfully!", "success")
  )
  componentDidUpdate(prevProps, prevState) {
    // Typical usage (don't forget to compare props):
    // {Object.keys(this.state.errors).length !== 0 && console.log('errors >>>>>')}

    if (Object.keys(this.state.errors).length ) {
      let error= '';
      for(let err in this.state.errors){
        error+= this.state.errors[err] + ','
      }
      console.log('error in didUpdate>>>>>>>>')
      swal("Meal error", error , "error")
      this.state.errors = {};

    }
    if (this.props.mealUpdated === true ) {
      this.alert();
      this.props.changeMealSuccess(false);
    }
    if ( this.props.isUpdateMealError === true) {
      swal("Meal error", 'error updating meal' , "error");
    }
    if(this.props.isMealDeleteError === true) {
      swal("Meal error", 'error deleting meal' , "error")
    }
    if(this.props.mealDeleted === true) {
      swal("Meal Deleted", 'Your meal has been ullydeleted successf' , "success");
      this.props.changeSuccessState(false);
    }
  }
  
  validate(data) {
    const errors = {};
    const nameRegex = /^([a-z']+(-| )?)+$/i
    // input.replace(/[^a-zA-Z ]/g, '') 
    if (!nameRegex.test(data.name) || !data.name) errors.name = 'Invalid name';
    if (!Number.isInteger(data.price)) errors.price = 'invalid number';
    if(!nameRegex.test(Date.description)) errors.description = 'invalid description';
    return errors
  }

  submit = () => {
    const errors = this.validate(this.state.data);
    console.log('returned error', errors)
    this.setState({ 
      errors: errors,
     });
    //  data: { ...this.state.data, [e.target.name]: e.target.value },
     
    if(Object.keys(errors).length==0){
      this.setState({ 
        edit: !this.state.edit,
       });
      this.props.updateMeal(this.state.data)
    }
    console.log('new errors:', this.state.errors, this.state.edit);
  }
  upload = (e) => {
    this.props.imageUpload(e.target.files[0], (secure_url) => {
      console.log(secure_url);
      // this.setState({
      //   image: secure_url
      // });
      this.setState({
         data: { ...this.state.data, image: secure_url}
      });
    });
    // this.setState({
    //   ...this.state, image: this.props.imageUrl
    // })
  }
  deleteMeal = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this meal!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this.props.deleteMeal(this.state.data.id);
      } else {
        swal("Your meal is safe!");
      }
    });
  }
  edit = () => {
    formerState = this.state;
    this.setState({
      ...this.state, edit: !this.state.edit
    })
  }
  cancel = () => {
    console.log('cancelled')
    this.setState({
      ...formerState
    })
  }

  save = () => {
    this.setState({
      ...this.state, edit: !this.state.edit
    })
  }

  onChange =(e) => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });
  }
  errorMessage = () => (
    swal("Good job!", "You clicked the button!", "error")
  )
  
  render() {
    const { errors } = this.state;
    const data = this.props.meal;
    console.log(this.state.errors, this.state.edit)
    return (
      <div className="m-c-container">
        <div className="m-c-imgcontainer">
          {/* <img className="foodies" src={this.state.image} alt="my food" /> */}
          <img className="" src={this.state.data.image} alt="my food" />
          <div className={this.state.edit ? "food-E-overlay" : 'hide'}></div>
          <div className={this.state.edit ? "foodies-info" : 'hide'}>
                      <input
                type='file'
                id='file' name='file'
                accept='image/*'
                onChange={this.upload}
                />
                      
            </div>
        </div>
      
        {this.props.isLoading || this.props.updatingMeal && <Loader 
            type="Puff"
            color="#00BFFF"
            height="100"	
            width="100"
          />   }
          <ToastContainer
            ref={ref => container = ref}
          />
        <div className="meal-info">
          <div className="meal-i-p">
            <input className={this.state.edit? 'myInputs card-input meal-name-input' : 'meal-name-input clear-default'} onChange={this.onChange} name="name" type="text" value={this.state.data.name} disabled={!this.state.edit} />
            <div className="meal-currency">
              <h5>$</h5>
              <input className={this.state.edit?'myInputs card-input meal-currency-input': 'clear-default meal-currency-input' } onChange={this.onChange} name='price' type="text" value={this.state.data.price} disabled={!this.state.edit} />
            </div>
          </div>
          <textarea className={this.state.edit? 'myInputs meal-i-t': 'meal-i-t clear-default'} onChange={this.onChange} id="advanced" name="description"
                  value={this.state.data.description}
                  disabled={!this.state.edit}
                  rows="3" cols="33" maxLength="120"
                  wrap="hard">
                  {/* {this.state.description} */}
        </textarea>
        </div>
        <div className={this.state.edit ? 'hide' : 'down-btn'} >
          <button onClick={this.edit}>Edit</button>
          <button onClick={() => this.deleteMeal()} className=""> Delete</button>
          {/* <button onClick={() => this.props.isModalOpened(true, data.id)} id="myBtn2" className="order-now" > <i id="f-awe" className="fa fa-edit fa-2x"></i></button> */}
        </div>
        <div className={this.state.edit ? 'down-btn' : 'hide'}>
          <button onClick={this.submit}>Save</button>
          <button onClick={this.cancel}>Cancel</button>
        </div>
      </div>
    );
  }
}

MealOptions.propTypes = {
  meal: PropTypes.object.isRequired,
};

export default MealOptions;
