"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

import { IconX } from "@tabler/icons-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Tooltip
} from "@nextui-org/react";

export default function DeleteButton({ todo }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const handleDelete = async () => {
    const supabase = createClientComponentClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      await supabase.from("todos").delete().eq("id", todo.id);
      onClose();
      router.refresh();
    }
  };
  return (
    <>
    <Tooltip color="default" content="Eliminar" placement={"bottom"} delay={1000}>
      <button
        onClick={onOpen}
        className="p-2 rounded-full hover:bg-pink-500/30 hover:text-pink-500 text-neutral-400"
      >
        <IconX className="w-5 h-5" />
      </button>
    </Tooltip>
      <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                ¿Eliminar Todo?
              </ModalHeader>
              <ModalBody>
                <p>Esto no se puede deshacer y se eliminará de su perfil.</p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="ghost" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="danger" onPress={handleDelete}>
                  Eliminar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
