import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {ModalNames, useModal} from "@/providers/modal.provider";
import {updateUrl} from "@/app/actions";
import {useToast} from "@/providers/toast.provider";

export default function UpdateModal () {
    const { currentModal, closeModal, modalProps } = useModal();
    const { openToast } = useToast();

    const { id, name, url } = modalProps;

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const name = formData.get("name") as string;
        const url = formData.get("url") as string;

        try {
            await updateUrl(id, url, name);
            openToast({
                text: "Kayıt başarıyla güncellendi",
                variant: "success"
            });
        } catch (e) {
            openToast({
                text: "Kayıt güncellenirken bir hata oluştu",
                variant: "error"
            });
        } finally {
            closeModal();
        }
    }
    return (
        <Dialog
            open={currentModal === ModalNames.UPDATE_MODAL}
            onClose={closeModal}
        >
            <DialogTitle>Kayıt Güncelleme</DialogTitle>
            <form onSubmit={onSubmit}>
                <DialogContent>
                    <DialogContentText>
                        Güncellemek istediğiniz kaydın bilgilerini aşağıdaki alanlardan değiştirebilirsiniz.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        defaultValue={name}
                        margin="dense"
                        id="name"
                        name="name"
                        label="Adı"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        defaultValue={url}
                        margin="dense"
                        id="url"
                        name="url"
                        label="Url"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeModal}>Vazgeç</Button>
                    <Button type="submit">Onayla</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}
