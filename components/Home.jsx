const contract = '';
const messages = Near.view(contract, 'get_messages', { limit: 3 });

const Message = styled.div`
  display: flex;
  gap: 1.2em;
`;

return (
  <>
    <pre>{JSON.stringify(messages, null, 2)}</pre>
    {messages.map((message) => (
      <Message>
        <Widget
          src="calebjacob.near/widget/AccountProfile"
          props={{
            accountId: message.author,
          }}
        />
        <Widget
          src="andyh.near/widget/TimeAgo"
          props={{
            blockHeight: message.block_height,
          }}
        />
        <p>{message.text}</p>
      </Message>
    ))}
  </>
);