// import uuid from 'uuid/v1';
// import moment from 'moment';
// import { colors } from '@material-ui/core';
import mock from 'src/utils/mock';

mock.onGet('/inventoryManagement/orders').reply(200, {
    profile: {
        avatar: '/images/avatars/avatar_11.png',
        canHire: false,
        country: 'USA',
        email: 'shen.zhi@devias.io',
        firstName: 'Shen',
        isPublic: true,
        lastName: 'Zhi',
        phone: '+40 777666555',
        state: 'Alabama',
        timezone: '4:32PM (GMT-4)'
    }
});