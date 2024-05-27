interface pageAccess {
  access: boolean;
  dependence?: { [key: string]: string };
}

// Objeto con los nombres de las páginas y sus permisos respectivos
const access: { [key: string]: pageAccess } = {
  "identify": {
    access: true
  },
  "signin": {
    access: true
  },
  "dashboard": {
    access: true
  },
  "dashboard/movements": {
    access: true,
    dependence: {
      card: "selected"
    }
  }
};

// Función para validar el acceso a una página basado en una dependencia
export function verifyAccess(namePage: string, dependence?: { [key: string]: string }): boolean {
  // Verificar si la página existe en los permisos
  if (access.hasOwnProperty(namePage)) {
    // Verificar si la página tiene definida una dependencia
    if (access[namePage].dependence) {
      // Verificar si la dependencia es la misma que la esperada en los permisos
      const pageDependence = access[namePage].dependence;
      if (JSON.stringify(pageDependence) === JSON.stringify(dependence)) {
        console.log(`Acceso permitido a ${namePage} con la dependence ${JSON.stringify(dependence)}`);
        return true;
      } else {
        console.log(`Acceso denegado a ${namePage} con la dependence ${JSON.stringify(dependence)}`);
        return false;
      }
    } else {
      console.log(`Acceso permitido a ${namePage}`);
      return true;
    }
  } else {
    console.log(`La página ${namePage} no existe en los permisos`);
    return false;
  }
}
