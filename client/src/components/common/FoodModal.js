import React, { component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

const customStyles = {
  overlay: {
    // position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0, 
    background: 'rgba(0,0,0,0.4)'
  },
  content: {
    // top: '50%',
    // left: '50%',
    // right: 'auto',
    // bottom: 'auto',
    // marginRight: '-50%',
    // transform: 'translate(-50%, -50%)',
    position: 'relative',
    background: '#f9f9f9',
    color: '#444',
    textShadow: 'none',
    borderRadius: '4px',
  },
};

class FoodModal extends React.Component {
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
  findMeal = (menu, mealId) => (
    menu.id == mealId
  )
  static getDerivedStateFromProps(props, state){
    console.log(props);
    const selectedMeal = props.menus.find((menu) => (
      menu.mealId == props.overlayId
    ))
    return {
      data: selectedMeal
    }
  }
  componentDidMount() {
  console.log(this.props.overlayId)
  //  const modalMeal = this.props.allMeals.find(this.findMeal)

  //  this.setState({
  //    ...this.state.data,
  //    data: modalMeal
  //  })
  //  console.log(this.state)
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
    let info = this.state.data.Meal
    console.log(this.state)
    return (
      <div>
        <Modal
          isOpen={this.props.isOpened}
          onRequestClose={() => this.props.isOverlayOpened(false)}
          ariaHideApp={false}
          overlayClassName='food-overlay'
          // className={customStyles.overlay}
          className='modalStyle'
          contentLabel="Example Modal"
        >
          <div className='modal-box'>
            <div className="fancybox">
              <img className='fancybox-img' src={this.state.data.Meal.image} alt="food image" />
            </div>
            <div className="modal-description">
              <div className="order-info">
                <h2>FOOD DETAILS</h2>
                <h1>{info.name}</h1>
                <div className="rect"></div>
                <div className="description">
                  <h3>Description</h3>
                  <p>{info.description}</p>

                </div>
                <div className="o-price">
                  <sup>$</sup>
                  <h4>{info.price}</h4>
                </div>
                <div onClick={()=> this.props.addMealToOrder(info)} className="order-btn">
                  ORDER
                </div>

              </div>
            </div>
          </div>
          
        </Modal>
      </div>
    );
  }
}
FoodModal.propTypes = {
  // allMeals: PropTypes.array.isRequired,
  isOpened: PropTypes.bool.isRequired,
  

  
};
export default FoodModal;
