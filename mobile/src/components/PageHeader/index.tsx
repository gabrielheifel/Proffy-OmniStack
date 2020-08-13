import React, { ReactNode } from 'react';
import { View, Image, Text } from 'react-native';
import { BorderlessButton, ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import backIcon from '../../assets/images/icons/back.png';
import logoImg from '../../assets/images/logo.png';

import styles from './styles';

interface PageHeaderProps {
   title: string;
   headerRight?: ReactNode;      // ? = opcional - ReactNode importa elemento do react
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, headerRight, children }) => {
   const { navigate } = useNavigation();

   function handleGoBack() {
      navigate('Landing');
   }

   return (
      <View style={styles.container}>
         <View style={styles.topBar}>
            <BorderlessButton onPress={handleGoBack}>
               <Image source={backIcon} resizeMode="contain" />
            </BorderlessButton>

            <Image source={logoImg} resizeMode="contain" />
         </View>

         <ScrollView>   
            <View style={styles.header}>
               <Text style={styles.title}>{title}</Text>
               {headerRight}
            </View>

            {children}
         </ScrollView>
      </View>
   );
}

export default PageHeader;