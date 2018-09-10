import React from 'react';
import sweetalert from 'sweetalert';
import AddMeal from '../../../src/components/forms/AddMeal';

jest.mock('sweetalert');

describe('Add Meal Component test-suite', () => {
  const props = {
    imageUpload: jest.fn(),
    createMeal: jest.fn(),
    isImageSuccess: false,
    clearMealImage: jest.fn(),
    mealImageUrl: '',
    isMealAdded: false,
    mealSuccessState: jest.fn(),
    creatingMeal: false,
    addMealError: '',
    open: jest.fn(),
  };

  const state = {
    mealInformation: {
      name: '',
      price: 0,
      description: '',
      image: '',
    },
  };

  it('renders properly', () => {
    const AddMealPageWrapper = shallow(<AddMeal {...props} />);
    expect(AddMealPageWrapper.exists()).toBeTruthy();
  });

  it('shows inline errors on validation failure', () => {
    const AddMealPageWrapper = shallow(<AddMeal {...props} />);
    AddMealPageWrapper.setState({
      mealInformation: {
        name: 123,
        description: 123,
        price: 'name',
        image: 234,
      },
    });
    AddMealPageWrapper.instance().onSubmit();
    const inLineErrElement = AddMealPageWrapper.find('InlineError').at(0);
    expect(inLineErrElement.props().text).toEqual('Invalid name input');
  });

  it('creates a meal when meal credentials are valid', () => {
    const AddMealPageWrapper = shallow(<AddMeal {...props} />);
    AddMealPageWrapper.setState({
      mealInformation: {
        name: 'Amala',
        description: 'very cool nigeriian meal',
        price: 7000,
        image: 'www.image.com',
      },
    });
    AddMealPageWrapper.instance().onSubmit();
    expect(props.createMeal).toHaveBeenCalled();
  });

  it('should display an image on successful upload', () => {
    const AddMealPageWrapper = shallow(<AddMeal {...props} />);
    AddMealPageWrapper.setState({
      mealInformation: {
        image: 'image.com',
      },
    });
    const preview = AddMealPageWrapper.find('.img-preview');
    expect(preview.hasClass('postedImg')).toBeTruthy();
  });

  it('should call mealSuccessState after meal has been added successfully', () => {
    const AddMealPageWrapper = shallow(<AddMeal {...props} />);
    AddMealPageWrapper.setProps({
      isMealAdded: true,
    });
    expect(props.mealSuccessState).toHaveBeenCalled();
  });

  it('should upload meal image when upload is triggered', () => {
    const AddMealPageWrapper = shallow(<AddMeal {...props} />);
    AddMealPageWrapper.instance().upload({ target: { files: [1] } });
    expect(props.imageUpload).toHaveBeenCalled();
  });

  it('should call clearMealImage from redux state after the image has been uploaded', () => {
    const AddMealPageWrapper = shallow(<AddMeal {...props} />);
    AddMealPageWrapper.setProps({
      isImageSuccess: true,
    });
    expect(props.clearMealImage).toHaveBeenCalled();
  });
});
