import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
// route list
import RouteList from './routeList'

const user = {
    auth: true,
    role: 'student',
    permissions: [
        'VisitHomepage'
    ]
}

function visitOrRedirect(route, user) {
    if (authRequired(route)) {
        if (userHasAuth(user)) {
            if (roleRequired(route)) {
                if (userHasRole(route, user)) {
                    if (permissionRequired(route)) {
                        if (userHasPermission(route, user)) {
                            return <Route exact key={route.id} path={route.path} component={route.component} />
                        } else {
                            // user doesnot have permission
                            return <Redirect to='/login' />;
                        }
                    } else {
                        // permission not required
                        return <Route exact key={route.id} path={route.path} component={route.component} />
                    }
                } else {
                    // user doesnot have role
                    return <Redirect to='/login' />;
                }
            } else {
                // role not required
                return <Route exact key={route.id} path={route.path} component={route.component} />
            }
        } else {
            // user not logged in
            return <Redirect to='/login' />;
        }
    } else {
        // auth not required
        return <Route exact key={route.id} path={route.path} component={route.component} />
    }
}

const main = () =>
    <Switch>
        {RouteList.map(route => visitOrRedirect(route, user))}
    </Switch>

// validations
function authRequired(route) {
    let required = false;

    if (route.protected) {
        required = true;
    }
    return required;
}
function roleRequired(route) {
    let required = false;

    if (route.role.length) {
        required = true;
    }
    return required;
}
function permissionRequired(route) {
    let required = false;

    if (route.permissions.length) {
        required = true;
    }
    return required;
}
function userHasAuth(user) {
    let authenticated = false;
    if (user.auth) {
        authenticated = true;
    }
    return authenticated;
}
function userHasRole(route, user) {
    let hasRole = false;
    if (route.role.includes(user.role)) {
        hasRole = true;
    }
    return hasRole;
}
function userHasPermission(route, user) {
    let hasPermission = false;
    const checkIntersection = route.permissions.filter(permission => user.permissions.includes(permission));

    if (checkIntersection.length) {
        hasPermission = true;
    }
    return hasPermission;
}

export default main
