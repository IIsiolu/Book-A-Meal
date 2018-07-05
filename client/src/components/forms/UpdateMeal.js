import React, { component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { Form, Input, TextArea, Button, Message } from 'semantic-ui-react';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

class UpdateMeal extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      data: {}
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  findMeal = (meal) => (
    meal.id == this.props.modalId
  )
  componentDidMount() {
   const modalMeal = this.props.allMeals.find(this.findMeal)

   this.setState({
     ...this.state.data,
     data: modalMeal
   })
   console.log(this.state)
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }
  onSubmit = (e) => {
    e.preventDefault()
    this.props.updateMeal(this.state.data)
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }
  onChange =(e) => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });
  }
  upload = (e) => {
    this.props.imageUpload(e.target.files[0])
  }


  render() {
    const {data} = this.state
    return (
      <div>
        <Modal
          isOpen={this.props.openModal}
          onRequestClose={() => this.props.isModalOpened(false)}
          ariaHideApp={false}
          style={customStyles.content}
          contentLabel="Example Modal"
        >
          <div>I am a modal</div>
          <form onSubmit={this.onSubmit}>
            <Form.Field >
              <label htmlFor='name'> Meal Name </label>
              <input
                type='text'
                id='name' name='name'
                value={data.name}
                onChange={this.onChange}
                placeholder='meal name' />
            </Form.Field>
            <Form.Field>
              <Form.TextArea label='description'
              placeholder='Input meal description...'
              name='description'
              value={data.description}
              onChange={this.onChange} />
            </Form.Field>
            <Form.Field>
              <label htmlFor='price'> Price </label>
              <input
                type='number'
                id='price' name='price'
                value={data.price}
                min={1}
                onChange={this.onChange}
                placeholder={data.price} />
            </Form.Field>
            <Form.Field >
              <input
                type='file'
                id='file' name='file'
                accept='image/*'
                // value={data.file}
                onChange={this.upload}
                />
            </Form.Field>
            {data.image ?
            <div className="postedImg">
              <img className="imgup" src={data.image} alt="image" />
            </div> : ''}
            <Button
              type="submit"
              primary
            >Post
            </Button>
          </form>
        </Modal>
      </div>
    );
  }
}
UpdateMeal.propTypes = {
  allMeals: PropTypes.array.isRequired,
  openModal: PropTypes.bool.isRequired,

  
};
export default UpdateMeal;
