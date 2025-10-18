import { Modal, Platform, TouchableOpacity } from 'react-native';
import { Text } from '../Text';
import { Form, Header, Input, ModalBody, Overlay } from './styles';
import { Close } from '../Icons/Close';
import Button from '../Button';
import { useState } from 'react';

interface TableModalProps {
    visible: boolean;
    onClose: () => void;
    onSave: (table: string) => void;
}

const TableModal = ({ onClose, onSave, visible }: TableModalProps) => {
    const [table, setTable] = useState('');

    const handleSave = () => {
        setTable('');
        onSave(table);
        onClose();
    };

    const handleClose = () => {
        setTable('');
        onClose();
    };

    return (
        <Modal transparent visible={visible} animationType="fade">
            <Overlay
                behavior={Platform.OS === 'android' ? 'heighht ' : 'padding'}
            >
                <ModalBody>
                    <Header>
                        <Text>Informe a mesa </Text>
                        <TouchableOpacity onPress={handleClose}>
                            <Close color="#666" />
                        </TouchableOpacity>
                    </Header>
                    <Form>
                        <Input
                            placeholder="Numero da mesa"
                            placeholderTextColor="#666"
                            keyboardType="number-pad"
                            onChangeText={setTable}
                        />
                    </Form>
                    <Button onPress={handleSave} disabled={!table}>
                        Salvar
                    </Button>
                </ModalBody>
            </Overlay>
        </Modal>
    );
};

export default TableModal;
