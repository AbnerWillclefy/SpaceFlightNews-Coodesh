import { useDisclosure, Spinner, VStack, Divider, Container, Text, Box, Flex, Input, Icon, Button, Menu, MenuButton, MenuItem, MenuList, MenuDivider } from '@chakra-ui/react'
import { RiSearchLine } from 'react-icons/ri'
import { BsChevronExpand } from 'react-icons/bs'
import { useEffect, useState } from 'react';
import { api } from './services/api';
import { RightArticleCard } from './components/RightArticleCard';
import { LeftArticleCard } from './components/LeftArticleCard';
import { ArticleModal } from './components/ArticleModal';

interface Article {
  id: number
  imageUrl: string
  newsSite: string
  publishedAt: string
  summary: string
  title: string
  url: string
}

const initialArticle = {
  id: 0,
  imageUrl: '',
  newsSite: '',
  publishedAt: '',
  summary: '',
  title: '',
  url: '',
}

function App() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(false)
  const [moreArticlesLoading, setMoreArticlesLoading] = useState(false)
  const [sortDates, setSortDates] = useState<'newest' | 'oldest'>('newest')
  const [title, setTitle] = useState('')
  const [currentArticle, setCurrentArticle] = useState<Article>(initialArticle)

  const { isOpen, onClose, onOpen } = useDisclosure()

  async function getArticles() {
    try {
      setLoading(true)
      const { data } = await api.get('articles')
      console.log("🚀 ~ file: App.tsx ~ line 32 ~ getArticles ~ data", data)
      setLoading(false)

      setArticles(data)
    } catch(error) {
      console.log(error)
    }
  }

  async function getMoreArticles() {
    try {
      setMoreArticlesLoading(true)
      const { data } = await api.get('articles', {
        params: {
          _start: articles.length
        }
      })
      setMoreArticlesLoading(false)

      const newArticles = [...articles, ...data]

      setArticles(newArticles)
    } catch(error) {
      console.log(error)
    }
  }
  
  async function getArticlesByTitle(title: string) {
    try {
      setLoading(true)
      const { data } = await api.get('articles', {
        params: {
          title_contains: title,
        }
      })
      setLoading(false)

      setArticles(data)
    } catch(error) {
      console.log(error)
    }
  }

  function openModal(article: Article) {
    setCurrentArticle(article)
    onOpen()
  }

  useEffect(() => {
    getArticles()
  }, [])

  return (
    <>
      <Container
        w='100%'
        maxW='100%' 
        bgImage='/assets/background.jpg'
        bgSize='cover'
        bgAttachment='fixed'
        bgPos='center'
      >
        <Box
          as='header'
          display='flex'
          alignItems='center'
          p='4'
          maxWidth='1440px'
          mx='auto'
        >
          <Flex
            display='flex'
            align='center'
            ml='auto'
            border='1px solid'
            borderColor='orange.500'
            p='2'
            borderRadius='5px'
            height='14'
          >
            <Input
              border='none'
              color='white'
              _focus={{border: 'none'}}
              placeholder='Pesquise por artigos'
              value={title}
              onChange={e => setTitle(e.target.value)}
              onKeyPress={e => {
                if(e.key === 'Enter') {
                  getArticlesByTitle(title)
                }
              }}
            />
            <Button
              bg='orange.400'
              ml='1'
              _hover={{backgroundColor: 'orange.600'}}
              onClick={() => getArticlesByTitle(title)}
            >
            <Icon as={RiSearchLine} color='#FFF' />
            </Button>
          </Flex>
          <Menu>
            <MenuButton 
              border='1px solid'
              borderColor='orange.500'
              p='1'
              ml='5'
              borderRadius='5px'
              width={['32', '56']}
              height='14'
              >
              <Flex w='100%' justify='space-between' align='center' px='4' >
                <Text color='orange.500'>Sort</Text>
                <Icon as={BsChevronExpand} color='orange.500' />
              </Flex>
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => setSortDates('oldest')}>Mais antigas</MenuItem>
              <MenuDivider />
              <MenuItem onClick={() => setSortDates('newest')}>Mais novas</MenuItem>
            </MenuList>
          </Menu>
        </Box>

        <Flex w='100%' justify='center' align='center' direction='column' py='16'>
          <Box border='1px solid' borderColor='orange.500' borderRadius='50%' p='6' mb='6' animation='forwards'>
            <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24">
              <path d="M8.566 17.842c-.945 2.462-3.678 4.012-6.563 4.161.139-2.772 1.684-5.608 4.209-6.563l.51.521c-1.534 1.523-2.061 2.765-2.144 3.461.704-.085 2.006-.608 3.483-2.096l.505.516zm-1.136-11.342c-1.778-.01-4.062.911-5.766 2.614-.65.649-1.222 1.408-1.664 2.258 1.538-1.163 3.228-1.485 5.147-.408.566-1.494 1.32-3.014 2.283-4.464zm5.204 17.5c.852-.44 1.61-1.013 2.261-1.664 1.708-1.706 2.622-4.001 2.604-5.782-1.575 1.03-3.125 1.772-4.466 2.296 1.077 1.92.764 3.614-.399 5.15zm11.312-23.956c-.428-.03-.848-.044-1.261-.044-9.338 0-14.465 7.426-16.101 13.009l4.428 4.428c5.78-1.855 12.988-6.777 12.988-15.993v-.059c-.002-.437-.019-.884-.054-1.341zm-5.946 7.956c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2z" fill='#D07017' /></svg>
          </Box>
          <Text
            color='orange.500'
            fontSize='3xl'
          >
            Space Flight News
          </Text>
        </Flex>
      </Container>
      <Divider
        w='100%'
        borderBottomWidth='1px'
        opacity='1'
        borderColor='gray.500'
      />
      <Container
        maxW={{base: '768px', xl: '1024px'}}
        mx='auto'
        display='flex'
        flexDirection='column'
        alignItems='center'
      >
        {
          loading 
          ? (
            <Spinner size='xl' my='20' thickness='2px' color='gray.500' />
          )
          : (
            <VStack
              w='100%'
              spacing='10'
              my='10'
              as='ul'
            >
              {articles
              .sort((a, b) => sortDates === 'oldest' 
                ? new Date(a.publishedAt).getDate() - new Date(b.publishedAt).getDate() 
                : new Date(b.publishedAt).getDate() - new Date(a.publishedAt).getDate())
              .map((article, index) => {
                if(index % 2 === 0) {
                  return (
                    <LeftArticleCard
                      title={article.title}
                      date={article.publishedAt}
                      description={article.summary}
                      image={article.imageUrl}
                      newsSite={article.newsSite}
                      key={article.id}
                      onClickSetArticle={() => openModal(article)}
                    />
                  )
                }

                return (
                <RightArticleCard
                  title={article.title}
                  date={article.publishedAt}
                  description={article.summary}
                  image={article.imageUrl}
                  newsSite={article.newsSite}
                  key={article.id}
                  onClickSetArticle={() => openModal(article)}
                />
                )})}
            </VStack>
          )
        }

        <VStack>
          <Box w='3' h='3' bgColor='gray.300' border='2px solid' borderColor='gray.400' />
          <Box w='3' h='3' bgColor='gray.300' border='2px solid' borderColor='gray.400' />
          <Box w='3' h='3' bgColor='gray.300' border='2px solid' borderColor='gray.400' />
        </VStack>
          <Button
            colorScheme='purple'
            variant='outline'
            mx='auto'
            my='10'
            onClick={getMoreArticles}
            isLoading={moreArticlesLoading}
          >
            Carregar mais
          </Button>
      </Container>

      <ArticleModal onClose={onClose} isOpen={isOpen} article={currentArticle} />
    </>
  );
}

export default App;
