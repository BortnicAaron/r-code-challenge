import AddCommentIcon from '@mui/icons-material/AddComment'
import PersonIcon from '@mui/icons-material/Person'
import { Avatar, Box, Button, Card, CardContent, Divider, List, ListItem, ListItemAvatar, ListItemText, Modal, Typography } from "@mui/material"
import { Fragment, useState } from "react"
import { usePaginatedComment } from '../../controllers/usePaginatedComment'
import { Character } from '../../interfaces/Character'
import { CharacterCommentForm } from './CharacterCommentForm'

const formattedDate = (timestamp: string) => new Date(timestamp).toLocaleDateString('es-ES', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
})

const CharacterComments = (character: Character) => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const paginatedComment = usePaginatedComment(character.id)
    const isDeleted = Boolean(character.deletedAt)


    return <Card sx={{ width: { xs: "100%", sm: '24rem' } }}  >
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: '1.5rem', alignItems: 'stretch', m: '1rem' }} >
            <Typography variant="h5" component={'h4'} color={false ? 'textDisabled' : 'textPrimary'}>
                Comentarios
            </Typography>
            <Divider variant="fullWidth" component="div" />
            {Boolean(character.deletedAt) && <Typography variant="subtitle1" component="div" gutterBottom color='error'>
                No podes dejar un comentario porque el personaje fue eliminado.
            </Typography>}
            {<Button
                onClick={handleOpen}
                variant="outlined"
                startIcon={<AddCommentIcon />}
                disabled={isDeleted}
            >
                Escribir
            </Button>}
            {paginatedComment.r && paginatedComment.r?.length > 0 && <><List sx={{ width: '100%', maxWidth: 360 }}>
                {
                    paginatedComment.r?.map((comment, length) => <Fragment key={comment.id}>
                        <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" >
                                    <PersonIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={formattedDate(String(comment.createdAt))}
                                sx={{ whiteSpace: 'pre-line' }}
                                slotProps={{
                                    secondary: {
                                        component: "div",
                                    },
                                }}
                                secondary={
                                    <Fragment>

                                        <CommentItem message={comment.message} maxLength={50} />
                                    </Fragment>
                                }
                            />
                        </ListItem>
                        {paginatedComment.r?.length! - 1 > length && <Divider variant="fullWidth" component="li" />}
                    </Fragment>)
                }
            </List>
                <Button
                    onClick={() => paginatedComment.fetchNextPage()}
                    disabled={!paginatedComment.hasNextPage}
                >
                    Ver más
                </Button>
            </>
            }

            {
                paginatedComment.r && paginatedComment.r?.length === 0 && <Typography variant="h6" component="div" sx={{ textAlign: 'center' }} marginBottom={'5rem'} marginTop={'5rem'} color=''>
                    No hay comentarios
                </Typography>
            }
            <Modal
                open={open}
                onClose={handleClose}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <Fragment>
                    <CharacterCommentForm character={character} handleClose={handleClose} />
                </Fragment>
            </Modal>
        </CardContent>
    </Card>
}

interface ICommentItem {
    message: string,
    maxLength: number
}

const CommentItem = ({ message: msg, maxLength = 100 }: ICommentItem) => {
    const [expanded, setExpanded] = useState(false)

    const toggleExpand = () => setExpanded(!expanded)

    const message = msg.replace(/\n+$/, '')



    const getTruncatedText = () => {

        let truncated = message.slice(0, maxLength)

        if (truncated.includes("\n")) {
            let lastNewLine = truncated.indexOf("\n")
            truncated = truncated.slice(0, lastNewLine)
        } else {
            if (message.length <= maxLength) return message
        }

        return truncated + "..."
    }

    return (
        <Box sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                {expanded ? message : getTruncatedText()}
            </Typography>
            {(message.length > maxLength || message.includes("\n")) && (
                <Button size="small" onClick={toggleExpand}>
                    {expanded ? "Ver menos" : "Ver más"}
                </Button>
            )}
        </Box>
    )
}


export { CharacterComments }
