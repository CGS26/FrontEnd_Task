
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout, ThemeSwitcher } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next';
import Table from './Table';
import Graph from './Graph';
import Stack from '@mui/material/Stack';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import TableViewIcon from '@mui/icons-material/TableView';
import DatasetLinkedOutlinedIcon from '@mui/icons-material/DatasetLinkedOutlined';
import TableComponent2 from './Table2';

interface DemoProps {

  window?: () => Window;
}


function ToolbarActionsSearch() {
    return (
      <Stack direction="row">
        <LanguageSelector/>
         
        <ThemeSwitcher />
      </Stack>
    );
  }
export default function Dashboard(props: DemoProps) {
  const { window } = props;
  const { t } = useTranslation();

  

  const NAVIGATION: Navigation = [
    {
      kind: 'header',
      title: t("MI"),
    },
    {
      segment: 'Table',
      title: t('table'),
      icon: <TableViewIcon />,
    },
    {
        segment: 'Table2',
        title: t('table')+" "+2,
        icon: <TableViewIcon />,
      },
    {
      segment: 'Graphs',
      title: t('graph'),
      icon: <EqualizerIcon />,
    },
  
  ];
  const router = useDemoRouter('/dashboard');

  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      branding={{
        logo: <DatasetLinkedOutlinedIcon style={{ fontSize: 40 }}/>,
        title: t('dashboard'),
        homeUrl: '/Table',
      }}
      window={demoWindow}
    >
           <DashboardLayout
        slots={{
          toolbarActions: ToolbarActionsSearch,
        }}
      >
        
       {router.pathname =='/Table'&&    
       
          <Table />     
          }

      {router.pathname =='/Graphs'&&  

        <Graph/>

       }
      {router.pathname =='/Table2'&&    
       
       <TableComponent2 />     
       }
      </DashboardLayout>
    </AppProvider>
  );
}
