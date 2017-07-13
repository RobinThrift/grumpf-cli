import React from 'react';
import {GET} from 'requestorators/dist/requests/before';
import {prepare} from 'requestorators/dist/prepare';

/**
 * @param id
 * @reafactor: stuff to do here
 */
function prep(id, route) {
    return [id, route];
}

// @refactor(Komponent): maybe this should be split into two components
class Komponent extends React.Component {
    @prepare(prep, true)
    @GET('/komps')
    _update(data) {
        this.setState({data}); // @fix(data): this actually needs some processing
    }
    
    // @feat(clickHandler): usage needs to be implemented
    _onClick() {

    }
    
    // @feat(render): improve this
    render() {
        return (<span>{this.state.data.name}</span>);
    }
}
