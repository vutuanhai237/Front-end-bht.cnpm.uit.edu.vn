import * as React from 'react';
import { isGrantedPermissions } from 'utils/permissionUtils';

class BaseComponent extends React.Component {

  isGranted = (permissionName) => {
    return isGrantedPermissions(permissionName);
  }

}

export default BaseComponent;