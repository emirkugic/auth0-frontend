type ProtectedRouteProps = {
    isAuthenticated?: boolean;
    authenticationPath: string;
    outlet: JSX.Element;
};

export default ProtectedRouteProps;