import React, {useEffect} from 'react';
import {gql, useMutation} from '@apollo/client';
import {useMutationFormSubmitCallback} from '../../../../../../services/graphql/hooks/useMutationFormSubmitCallback';
import {GraphqlMutationResponse} from '../../../../../../services/graphql/GraphqlMutationResponse';
import {setJwt} from '../../../../../../util/jwt';
import {useDispatch, useSelector} from 'react-redux';
import {ACTION_RECEIVE_LOGIN, selectLoggedInUserName} from '../../redux/reducer';
import {form__login, selectLoginInput} from '../../selectors';
import {StandardForm} from '../../../../../../components/form/Form';
import {IUser} from '../../../../../../models/user/models';
import {FeatureRequirement} from '../../../../../_util';

const LOGIN_MUTATION = gql`
    mutation LogIn($user: UserInput, $password: PasswordInput) {
        logIn(user: $user, password: $password) {
            jwt
            username
            user {
                name
                username
            }
        }
    }
`;

function LoginReceivedEffect({username, user, jwt}: { username: string, user: IUser, jwt: string }) {
    const dispatch = useDispatch();
    useEffect(() => {
        if (!jwt || !username) return;
        setJwt(jwt)
        dispatch({
                     type:    ACTION_RECEIVE_LOGIN,
                     payload: {
                         username,
                         user,
                         jwt,
                     },
                 })
    }, [jwt]);
    return <></>
}

function ActiveForm() {
    const [send, response]    = useMutation(LOGIN_MUTATION);
    const onsubmit            = useMutationFormSubmitCallback(send, selectLoginInput);
    let resp                  = response?.data?.logIn ?? {};
    let {username, jwt, user} = resp;

    return (
        <>
            <LoginReceivedEffect jwt={jwt} username={username} user={user}/>
            <StandardForm form={form__login} onSubmit={onsubmit}/>
            <GraphqlMutationResponse response={response}/>
        </>
    )
}
export function LoginForm({alt}: { alt?: any }) {
    const loggedInUser = useSelector(selectLoggedInUserName);
    if (loggedInUser) return alt ?? null;
    return <FeatureRequirement name="projects"><ActiveForm/></FeatureRequirement>;
}