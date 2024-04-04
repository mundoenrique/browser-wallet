import { NextResponse, NextRequest } from 'next/server';

//TODO:Para pruebas
export async function POST(req: NextRequest) {
  const XRequestId = req.headers.get('X-Request-Id');
  const request = await req.json();
  const data = {
    method: req.method,
    XRequestId,
    ...request,
  };
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  return NextResponse.json(data, { status: 200 });
}

export async function GET(req: NextRequest) {
  const XRequestId = req.headers.get('X-Request-Id');
  //const request = await req.json();
  const data = {
    method: req.method,
    XRequestId,
    ...validateRedired(req),
  };
  console.log(req.nextUrl.search);
  await new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });

  return NextResponse.json(data, { status: 200 });
}

const validateRedired = (req: NextRequest) => {
  const path = req.nextUrl.search.split('?')[1];
  const validateObject: { [key: string]: object } = {
    userOnboardingInProcess: userOnboardingInProcess,
    userRegister: userRegister,
    userNotRegister: userNotRegister,
  };
  return validateObject[path] || validateObject['userNotRegister'];
};

const userOnboardingInProcess = {
  code: '200.00.000',
  datetime: '2024-02-01T03:58:45.207Z',
  message: 'Process Ok',
  data: {
    status: {
      onboardingUuid: 'a4f97d13-0d69-4d6d-9042-a857cb08e391',
      code: 'PH_IN_PROGRESS',
      name: 'Onboarding en curso',
    },
    currentOnboardingPhaseCode: 'ONB_PHASES_PASSWORD',
    onboardingPhases: [
      {
        onboardingPhaseUuid: '05294de7-461b-429f-99ef-f5c6ae6178b3',
        onboardingPhaseCode: 'ONB_PHASES_PEP',
        onboardingPhaseStatusCode: 'PHASE_COMPLETED',
        metadata: {
          isPep: true,
          pepForm: {
            address: 'Los geranios 123',
            companyName: 'Avon',
            department: 'Lima',
            district: 'Miraflores',
            endDate: '2028-12-31',
            holdShare: true,
            isFamilyAlive: true,
            position: 'Ventas',
            province: 'Lima',
          },
          relatives: [
            {
              documentNumber: '12345679',
              documentType: 'DNI',
              fullName: 'Jhon Smith',
            },
          ],
        },
      },
      {
        onboardingPhaseUuid: '68b80c73-40a7-4734-8ce2-0c50dcb512bb',
        onboardingPhaseCode: 'ONB_PHASES_TERMS',
        onboardingPhaseStatusCode: 'PHASE_COMPLETED',
        metadata: {
          consultant: {
            consultantCode: '00123456',
            firstName: 'AURA ESTELA',
            lastName: 'Emmet',
            email: 'griniramos@gmail.com',
            phoneNumber: '985258994',
            address: 'Los geranios 123',
            documentType: 'DNI',
            documentNumber: '44556677',
            countryCode: 'PE',
            uuid: '6c1def68-509e-49f4-a289-0da032e81e07',
          },
          terms: [
            {
              code: 'TERM1',
            },
            {
              code: 'TERM2',
            },
          ],
        },
      },
      {
        onboardingPhaseUuid: '3ea21728-f980-4be0-bb33-a2f601a02292',
        onboardingPhaseCode: 'ONB_PHASES_CONSULT_DATA',
        onboardingPhaseStatusCode: 'PHASE_COMPLETED',
        metadata: {
          consultant: {
            occupationUuid: '66636e69-5f3e-430a-a8ee-8ce59e9e1320',
            companyName: 'Avon',
            companyPosition: 'Ventas',
            companyType: 'Privado',
          },
        },
      },
    ],
  },
};

const userRegister = {
  code: '200.00.000',
  datetime: '2024-02-19T14:15:46.832Z',
  message: 'Process Ok',
  data: {
    status: {
      code: 'PH_REGISTER',
      name: 'User Register',
    },
    user: {
      userId: '95b04649-f2e6-4a8a-911f-a8777ca79cd0',
      firstName: 'RAUL',
      lastName: 'RAMOS',
    },
  },
};

const userNotRegister = {
  code: '200.00.000',
  datetime: '2024-02-19T14:15:46.832Z',
  message: 'Process Ok',
  data: {
    status: {
      code: 'PH_PENDING',
      name: 'Onboarding pendiente',
    },
    currentOnboardingPhaseCode: 'ONB_PHASES_TERMS',
    consultant: {
      address: 'Los geranios 123',
      consultantCode: '000001252',
      countryCode: 'PE',
      documentNumber: '0002610351',
      documentType: 'DNI',
      email: 'auristelapz@hotmail.com',
      firstName: 'AURA ESTELA',
      lastName: 'PALACIOS ZAPATA',
      phoneNumber: '968919573',
    },
  },
};
