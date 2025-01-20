import { Button, ButtonGroup } from '@mui/material';
import { useStore } from '../store/Store.tsx';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const {  setLanguage } = useStore();
  const { i18n } = useTranslation();

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (

    <ButtonGroup variant="text" aria-label="Basic button group">
    <Button onClick={()=>handleLanguageChange('en')}>En</Button>
    <Button onClick={()=>handleLanguageChange('es')}>Es</Button>
    <Button onClick={()=>handleLanguageChange('de')}>De</Button>
  </ButtonGroup>
  );
};

export default LanguageSelector;
