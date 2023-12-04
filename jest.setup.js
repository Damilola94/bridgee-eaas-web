import '@testing-library/jest-dom';

const windowMock = {
  scrollTo: jest.fn()
};

Object.assign(global, global, windowMock);
