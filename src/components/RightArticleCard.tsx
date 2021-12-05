import { Flex, Image, Heading, Text, Button } from '@chakra-ui/react'


interface RightArticleCardProps {
  image: string
  title: string
  date: string
  description: string
  newsSite: string
  onClickSetArticle: () => void
}

export function RightArticleCard({ date, description, image, title, newsSite, onClickSetArticle }: RightArticleCardProps) {
  return (
    <Flex
      as='article'
      w='100%'
      h={{ base: 'unset', md: '56' }}
      flexDirection={{ base: 'column', md: 'row' }}
    >
      <Flex
        h='100%'
        w='100%'
        direction='column'
        justifyContent='space-between'
        align={{base: 'center', md: 'flex-start'}}
      >
        <Heading
          fontSize={['lg', 'xl', '2xl']}
          noOfLines={2}
          textAlign={{base: 'center', md: 'left'}}
        >
          {title}
        </Heading>
        <Flex
          w='100%'
          justify='space-between'
          align='center'
          py={{base: '2', md: '0'}}
        >
          <Text>
            {new Date(date).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}
          </Text>
          <Text
            px='2'
            bgColor='gray.300'
            border='2px solid'
            borderColor='gray.500'
          >
            {newsSite}
          </Text>
        </Flex>
        <Text noOfLines={3}>
          {description}
        </Text>
        <Button
          w={{base: '36', md: '32'}}
          color='white'
          fontWeight='400'
          bgColor='purple.400'
          _hover={{ bgColor: 'purple.500' }}
          onClick={onClickSetArticle}
          mt={{base: '2', md: '0'}}
        >
          Ver Mais
        </Button>
      </Flex>
      <Image
        src={image}
        alt='Imagem do artigo'
        ml={{base: '0', md: '10'}}
        h='100%'
        order={{ base: '-1', md: '1' }}
      />
    </Flex>
  )
}