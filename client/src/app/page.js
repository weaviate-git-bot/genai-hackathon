import { Divider, useDisclosure } from "@nextui-org/react";
import ConversationTable from "./components/Table";
import Modal from "./components/Modal";

export default async function Home({ searchParams }) {
  const conversation_id = "123";

  const { avg_response_length, unique_words, response_time, q_and_a } = await fetch(
    `${process.env.URL}/stats/conversation/${conversation_id}`, { cache: "no-store" }
  ).then((res) => res.json());

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="p-4 md:p-10 mx-auto max-w-7xl flex flex-col">
      <div className="flex h-5 items-center space-x-4 text-small justify-center">
        <div>Average response length: {avg_response_length || 0} characters</div>
        <Divider orientation="vertical" />
        <div>Unique response length: {unique_words || 0} characters</div>
        <Divider orientation="vertical" />
        <div>Response time: {response_time || 0} seconds</div>
      </div>
      <div className="flex justify-center items-center py-8">
        <ConversationTable data={q_and_a || []} />
      </div>
      <Modal isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} />
    </div>
  );
}
