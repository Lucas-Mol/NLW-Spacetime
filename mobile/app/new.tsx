import { styled } from 'nativewind'
import { View, Text, Switch, TextInput, ScrollView } from 'react-native'
import NLWLogo from '../src/assets/nlw-spacetime-logo.svg'
import { Link } from 'expo-router'
import Icon from '@expo/vector-icons/Feather'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import React, { useState } from 'react'

const StyledNLWLogo = styled(NLWLogo)

export default function NewMemory() {
  const { top, bottom } = useSafeAreaInsets()

  const [isPublic, setIsPublic] = useState(false)

  return (
    <ScrollView
      className="flex-1 px-8"
      contentContainerStyle={{ paddingTop: top, paddingBottom: bottom }}
    >
      <View className="mt-6 flex-row items-center justify-between">
        <StyledNLWLogo />

        <Link href="/memories" asChild>
          <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-purple-500">
            <Icon name="arrow-left" size={16} color="#FFF" />
          </TouchableOpacity>
        </Link>
      </View>

      <View className="mt-6 space-y-6">
        <View className="flex-row items-center gap-2">
          <Switch
            value={isPublic}
            onValueChange={setIsPublic}
            thumbColor={isPublic ? '#9b79ea' : '#56565a'}
            trackColor={{ false: '#2c2c31', true: '#372560' }}
          />
          <Text className="font-body text-base text-gray-200">
            Tornar memória pública
          </Text>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        className="h-32 items-center justify-center rounded-lg border border-dashed border-gray-500 bg-black/20"
      >
        <View className="flex-row items-center gap-2">
          <Icon name="image" color={'#FFF'} />
          <Text className="font-body text-sm text-gray-200">
            Adicionar foto ou vídeo de capa
          </Text>
        </View>
      </TouchableOpacity>

      <TextInput
        multiline
        className="p-0 py-8 font-body text-lg text-gray-50"
        placeholderTextColor={'#56565a'}
        placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
      />

      <TouchableOpacity
        activeOpacity={0.75}
        className="items-center self-end rounded-full bg-green-500 px-5 py-3"
      >
        <Text className="font-alt text-sm uppercase text-black">Salvar</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}