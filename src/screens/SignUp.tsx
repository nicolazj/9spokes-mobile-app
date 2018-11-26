import { Constants } from 'expo';
import { Field, Formik } from 'formik';
import React from 'react';
import { Alert, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NavigationScreenProp } from 'react-navigation';
import * as Yup from 'yup';
import agent from '../agent';
import { FormikTextInput } from '../primitives';
import { Button, Container, Delimiter, FormTitle, Link, SafeArea, Text } from '../primitives';
import { GoogleButton } from '../primitives';
import { SCREENS } from '../routes/constants';
import auth from '../states/Auth';
import { SignUpPayload } from '../types';

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

export default class SignUp extends React.Component<Props> {
  public componentDidMount() {
    agent.token.public();
  }
  public onPress = async (values: SignUpPayload) => {
    try {
      const userExisted = agent.public.user.isExisted(values.userName);
      if (!userExisted) {
        console.log('user not existed');
        // await agent.public.user.create(values);
      } else {
        Alert.alert('Error', 'Username existed');
      }
    } catch (err) {
      Alert.alert('Log in failed', 'Unable to sign in, try again later');
    }
  };
  public googleLogin() {
    console.log('google login');
  }
  public render() {
    return (
      <Container>
        <SafeArea>
          <KeyboardAwareScrollView extraHeight={Constants.statusBarHeight}>
            <Container padding={true}>
              <Formik
                initialValues={{
                  username: '',
                  password: '',
                  firstName: '',
                  lastName: '',
                }}
                validationSchema={Yup.object().shape({
                  firstName: Yup.string().required('Required'),
                  lastName: Yup.string().required('Required'),
                  userName: Yup.string().required('Required'),
                  password: Yup.string().required('Required'),
                })}
                onSubmit={this.onPress}>
                {({ handleSubmit }) => (
                  <View style={{ flex: 1 }}>
                    <FormTitle style={{ marginBottom: 20 }}>Create an account</FormTitle>
                    <Field name="firstName" component={FormikTextInput} placeholder="First name" />
                    <Field name="lastName" component={FormikTextInput} placeholder="Last name" />
                    <Field name="userName" component={FormikTextInput} placeholder="Email" />
                    <Field name="password" component={FormikTextInput} placeholder="Password" secureTextEntry={true} />
                    <Button title="Proceed" onPress={handleSubmit} />
                  </View>
                )}
              </Formik>
              <Delimiter />
              <GoogleButton onPress={this.googleLogin} />
            </Container>
          </KeyboardAwareScrollView>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 15,
              justifyContent: 'center',
              position: 'absolute',
              bottom: 20,
              width: '100%',
            }}>
            <Text>Already have an account? </Text>
            <Link title="Log in" onPress={() => this.props.navigation.navigate(SCREENS[SCREENS.SIGN_IN])} />
          </View>
        </SafeArea>
      </Container>
    );
  }
}
