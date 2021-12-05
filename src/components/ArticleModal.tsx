import { useBreakpointValue, Flex, Text, Image, Button, Heading, Modal, ModalOverlay, ModalContent, ModalBody } from '@chakra-ui/react'

interface Article {
  id: number
  imageUrl: string
  newsSite: string
  publishedAt: string
  summary: string
  title: string
  url: string
}

interface ArticleModalProps {
  article: Article
  onClose: () => void
  isOpen: boolean
}

export function ArticleModal({ article, onClose, isOpen }: ArticleModalProps) {
  
  const sizes = useBreakpointValue({
    base: 'xs',
    sm: 'md',
    md: 'xl',
    lg: '2xl',
    xl: '3xl',
  })

  console.log(sizes)

  return (
    <Modal onClose={onClose} isOpen={isOpen} size={sizes} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalBody
          px={['6', '12', '14', '16']}
          py={['6', '12', '14', '16']}
        >
          <Flex
            direction='column'
            align='center'
            justify='space-between'
          >
            <Flex
              direction={{base: 'column', md: 'row'}}
              align='center'
            >
              <Image src={article.imageUrl} h='52' mr={{base: '0', md: '10'}} />
              <Flex
                direction='column'
                align='flex-start'
              >
                <Heading
                  fontSize='2xl'
                  noOfLines={2}
                >
                  {article.title}
                </Heading>
                <Text
                  my='2'
                >
                  {new Date(article.publishedAt).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </Text>
                <Text noOfLines={5}>
                  {article.summary}
                </Text>
              </Flex>
            </Flex>
            <Button
              mt='10'
              fontSize='xl'
              fontWeight='400'
              color='white'
              p='6'
              bgColor='purple.400'
              _hover={{ bgColor: 'purple.500' }}
              as='a'
              href={article.url}
              target='_blank'
            >
              Ir para o site
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}