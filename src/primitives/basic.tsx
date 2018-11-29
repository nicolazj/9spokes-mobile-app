import React from 'react';
import {
  Platform,
  SafeAreaView,
  Text as Text_,
  TextInput as TextInput_,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import { human } from 'react-native-typography';
import { Styles } from 'styled-components';
import Picker_ from '../components/Picker';
import { scale } from '../scale';
import styled, { th } from '../styled';

export const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

export const Text = styled(Text_)`
  font-size: ${scale(14)}px;
`;

interface ContainerProps {
  padding?: boolean;
  vcenter?: boolean;
  hcenter?: boolean;
}
export const Container = styled(View)<ContainerProps>`
  flex: 1;
  width: 100%;
  background-color: ${th('color.view.bg')};
  ${p => (p.padding ? `padding: 0 ${scale(20)}px` : '')};
  ${p => (p.vcenter ? 'justify-content: center' : '')};
  ${p => (p.hcenter ? 'align-items: center' : '')};
`;

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
`;

/***
 * Form
 */

export const TextInput = styled(TextInput_).attrs({
  selectionColor: props => th('color.main')(props),
  placeholderTextColor: props => th('color.grey')(props),
})`
  border: 1px solid ${th('color.grey')};
  width: 100%;
  padding: ${scale(16)}px;
  border-radius: 5px;
  font-size: ${scale(14)}px;
`;

export const Picker = styled(Picker_)`
  border: 1px solid ${th('color.grey')};
  width: 100%;
  padding: ${scale(16)}px;
  border-radius: 5px;
`;
export const FormGroup = styled(View)`
  height: ${scale(60)}px;
  width: 100%;
  margin: 10px 0;
`;
export const FormError = styled(Text)`
  color: red;
  font-size: ${scale(12)}px;
`;
export const FormTitle = styled(Text)`
  ${human.title1Object as Styles};
  text-align: center;
  margin: ${scale(20)}px;
`;

export const FormDesc = styled(Text)`
  font-size: ${scale(14)}px;
  color: ${th('color.grey')};
`;
