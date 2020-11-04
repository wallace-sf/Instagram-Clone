import React from 'react';
import { Image } from 'react-native';

import Icon from 'react-native-vector-icons/SimpleLineIcons';

import { Container } from './styles';

import logo from '../../assets/img/instagram.png';

const Header = () => {
  return (
    <Container>
      <Icon name="camera" size={27} color="#000" />
      <Image source={logo} />
      <Image
        source={{
          uri: 'https://static.thenounproject.com/png/2796195-200.png',
        }}
        style={{ height: 30, width: 30 }}
      />
    </Container>
  );
};

export default Header;
