/**
 * Object with the names of the pages and their respective permissions
 */
const access: { [key: string]: any } = {
  identify: {
    access: true,
    login: false,
  },
  signin: {
    access: true,
    login: false,
  },
  dashboard: {
    access: true,
    login: true,
  },
  'dashboard/movements': {
    access: true,
    login: false,
    dependence: {
      card: 'selected',
    },
  },
};

/**
 * Function to validate access to a page based on a dependency
 * @param namePage - Name of the current page
 * @param dependence - Defined dependencies
 */
export function verifyAccess(namePage: string, dependence?: { [key: string]: string }): any {
  if (access.hasOwnProperty(namePage)) {
    if (access[namePage].dependence) {
      const pageDependence = access[namePage].dependence;
      if (JSON.stringify(pageDependence) === JSON.stringify(dependence)) {
        return true;
      } else {
        return false;
      }
    } else {
      return access[namePage];
    }
  } else {
    return false;
  }
}
