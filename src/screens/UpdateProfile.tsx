import { Ionicons } from '@expo/vector-icons';
import { WebBrowser } from 'expo';
import { Body, Left, List, ListItem, Right, Text } from 'native-base';
import React from 'react';
import { ScrollView } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import Button from '../components/Button';
import * as P from '../primitives';
import { SCREENS } from '../routes/constants';
import { scale } from '../scale';
import authState, { AuthState } from '../states/Auth';
import { SubscribeHOC } from '../states/helper';
import userState, { UserState } from '../states/User';
import styled, { th } from '../styled';

interface Props {
  navigation: NavigationScreenProp<any, any>;
  states: [UserState, AuthState];
}
const Title = styled(P.H1)`
  font-size: ${scale(24)}px;
  margin: ${scale(16)}px;
`;
const BodyText = styled(Text)`
  color: ${th('color.grey')};
`;
export class Settings extends React.Component<Props> {
  render() {
    const [userState, authState] = this.props.states;
    const { me, companies } = userState.state;
    const company = companies
      ? companies.find(c => c.companyUuid === authState.state.companyUuid)
      : null;
    return (
      <P.Container>
        <ScrollView>
          <Title>Account</Title>
          <BodyText>{`${me.firstName} ${me.lastName}`}</BodyText>
        </ScrollView>
      </P.Container>
    );
  }
}
export default SubscribeHOC([userState, authState])(Settings);