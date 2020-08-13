import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
// AsyncStorege é um banco de dados mais leve, onde só se pode salvar dados em texto
import AsyncStorage from '@react-native-community/async-storage';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import api from '../../services/api';

import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';

function TeacherList(){
   const [teachers, setTeachers] = useState([]);
   const [favorites, setFavorites] = useState<number[]>([]);      //array numerico
   const [isFiltersVisible, setIsFiltersVisible] = useState(false);

   const [subject, setSubject] = useState('');
   const [week_day, setWeekDay] = useState('');
   const [time, setTime] = useState('');

   function loadFavorites() {
      AsyncStorage.getItem('favorites').then(response => {
         if (response) {
            const favoredTeachers = JSON.parse(response);
            
            const favoredTeacherIds = favoredTeachers.map((teacher: Teacher) => {
               return teacher.id;
            })
            
            setFavorites(favoredTeacherIds);
         }
      });
   }
   
   function handleToggleFiltersVisible() {
      setIsFiltersVisible(!isFiltersVisible);
   }

   async function handleFiltersSubmit() {
      loadFavorites();

      const response = await api.get('classes', {
         params: {
            subject,
            week_day,
            time,
         }
      });

      setIsFiltersVisible(false);
      setTeachers(response.data);
   }

   return (
      <View style={styles.container}>
         <PageHeader 
            title="Proffys disponíveis" 
            headerRight={(
               <BorderlessButton onPress={handleToggleFiltersVisible}>
                  <Feather name="filter" size={20} color="#fff" />   
               </BorderlessButton>
            )}
         >
            { isFiltersVisible && (
               <View style={styles.searchForm}>
                  <Text style={styles.label}>Matéria</Text>
                  <TextInput                       // Usar expo picker para usar select nos input's
                     style={styles.input}
                     value={subject}
                     onChangeText={text => setSubject(text)}
                     placeholder={"Qual a matéria?"}
                     placeholderTextColor="#c1bccc"
                  />

                  <View style={styles.inputGroup}>
                     <View style={styles.inputBlock}>
                        <Text style={styles.label}>Dia da Semana</Text>
                        <TextInput
                           style={styles.input}
                           value={week_day}
                           onChangeText={text => setWeekDay(text)}
                           placeholder="Qual o dia?"
                           placeholderTextColor="#c1bccc"
                        />
                     </View>

                     <View style={styles.inputBlock}>
                        <Text style={styles.label}>Horário</Text>
                        <TextInput
                           style={styles.input}
                           value={time}
                           onChangeText={text => setTime(text)}
                           placeholder="Qual horário?"
                           placeholderTextColor="#c1bccc"
                        />
                     </View>
                  </View>

                  <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
                     <Text style={styles.submitButtonText}>Filtrar</Text>
                  </RectButton>
               </View>
            )}
         </PageHeader>
      

         <ScrollView
            style={styles.teacherList}
            contentContainerStyle={{
               paddingHorizontal: 16,
               paddingBottom: 16,
            }}   
         >
            {teachers.map((teacher: Teacher) => {
               return (
                  <TeacherItem 
                     key={teacher.id} 
                     teacher={teacher} 
                     favored={favorites.includes(teacher.id)} // chama se o key esta incluso em favorites
                  />
               )
            })}   
         </ScrollView>
      </View>
   );
}

export default TeacherList;


// Vai no bd, busca a lista de favorites e salva no array setFavorites
// useEffect(() => {       // Recebe a função que vai ser disparada
      
// }, []);   // Array indica quando sera disparada, no caso vazio, uma vez só no começo do component
