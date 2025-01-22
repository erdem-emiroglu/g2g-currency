import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {ModalNames, useModal} from "@/providers/modal.provider";
import {updateUrl} from "@/app/actions";
import {useToast} from "@/providers/toast.provider";
import FormInput from "@/components/inputs/form-input";
import {urlRegex} from "@/constants/regex";
import {useForm} from "react-hook-form";

type UpdateInputs = {
    name: string,
    url: string
}

export default function UpdateModal () {
    const { currentModal, closeModal, modalProps } = useModal();
    const { openToast } = useToast();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UpdateInputs>()

    const { id, name, url } = modalProps;

    const onSubmit = async (data: UpdateInputs) => {
        const {name, url} = data;

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
            <DialogTitle>Kayıt Düzeltme</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <DialogContentText>
                        Güncellemek istediğiniz kaydın bilgilerini aşağıdaki alanlardan değiştirebilirsiniz.
                    </DialogContentText>
                    <FormInput
                        id="name"
                        name="name"
                        label="Adı"
                        register={register}
                        errors={errors}
                        defaultValue={name}
                        validationRules={{
                            required: 'Ad alanı boş bırakılamaz',
                        }}
                    />
                    <FormInput
                        id="url"
                        name="url"
                        label="Url"
                        register={register}
                        errors={errors}
                        defaultValue={url}
                        validationRules={{
                            required: 'Url alanı boş bırakılamaz',
                            pattern: {
                                value: urlRegex,
                                message: 'Yanlış url formatı',
                            },
                        }}
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
