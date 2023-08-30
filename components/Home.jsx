const contract = 'ece61a112fbb05b5ff96fd4d63cb259c4bae966477829666d46ddc4e5121d801';

State.init({
  msg: ""
})

const messages = Near.view(contract, 'get_messages', { limit: 12 }, null, true);

const sendMessage = () => {
  if (state.msg.length != 0) {
    let text = state.msg
    if (state.img?.cid) {
      text = `${text}_img_${state.img.cid}`
    }
    Near.call(contract, 'send', { text })
  }
}

const handleUpload = body => {
  asyncFetch("https://ipfs.near.social/add", {
    method: "POST",
    headers: { Accept: "application/json" },
    body,
  }).then((res) => {
    const cid = res.body.cid;
    State.update({ img: { cid } });
  });
};

const selectFile = files => {
  if (files) {
    State.update({ img: { uploading: true, cid: null } });
    handleUpload(files[0]);
  }
}

const Bg = styled.div`
  background-color: #393e46;
  height: 80vh;
  border-radius: 30px;
  padding: 2em 10em;
`

const Messages = styled.div`
  ::-webkit-scrollbar {
    width: 0.5em;
  }

  ::-webkit-scrollbar-thumb {
    display: none;
  }
  ::-webkit-scrollbar-track {
    display: none;
  }

  overflow: auto; /* Show the scrollbar outside of WebKit browsers */
  scrollbar-width: none; /* Hide the scrollbar for Firefox */
  -ms-overflow-style: none; /* Hide the scrollbar for IE/Edge */
  height: 92%;
  margin-top: 20px;
`

const Message = styled.div`
  display: flex;
  gap: 1.2em;
  width: 70%;
  justify-content: space-between;
  background-color: white;
  border-radius: 30px;
  padding: 5px 10px;
  margin-bottom: 1.5em;
  box-shadow: 0px 5px 10px black;
  position: relative;
`;

const Send = styled.div`
  width: 100%;
  border-radius: 50px;
  border: 2px solid grey;
  display: flex;
  background-color: black;
  box-shadow: 0px 5px 10px black;
  gap: 2px;
`;


return (
  <Bg>
    <Send>
      <div
        style={{ backgroundColor: "white", border: 0, borderRadius: "50%", padding: "12px" }}
      >
        <Files
          multiple={false}
          accepts={["image/*"]}
          minFileSize={1}
          clickable
          onChange={selectFile}
        >
          <img src="https://icons.veryicon.com/png/o/media/media-and-control/image-add-fill-3.png" height={25}/>
        </Files>
      </div>
      <input
        type="text"
        onInput={(e) => State.update({ msg: e.target.value })}
        value={state.msg}
        placeholder="Enter your message..."
        style={{ color: "white", backgroundColor: "black", border: 0, outlineWidth: 0 }}
      />
      <button
        style={{ backgroundColor: "white", border: 0, borderRadius: "50%", padding: "12px" }}
        onClick={() => {
          sendMessage();
        }}
      >
        <img src="https://icons.veryicon.com/png/o/business/imi-project/send-message-11.png" height={25} width={25}/>
      </button>
    </Send>
    <Messages>
    {
      messages.map((message) => {
        const [ msg, media ] = message.text?.split("_img_")
        return (
          <>
            {
              media ? (
                <img
                  style={{ objectFit: "cover", width: "64%", marginLeft: "3%", border: "4px solid white", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}
                  src={`https://ipfs.near.social/ipfs/${media}`}
                  alt="message media"
                />
              ) : <></>
            }
            <Message>
              <Widget
                src="calebjacob.near/widget/AccountProfile"
                props={{
                  accountId: message.author,
                }}
                />
              <div style={{ textAlign: "right", flexGrow: 1, paddingRight: "10px", maxWidth: "70%" }}>
                <p style={{ fontWeight: "bold"  }}>{msg}</p>
                <div style={{ position: "absolute", bottom: 0, right: "20px" }}>
                  <Widget
                    src="andyh.near/widget/TimeAgo"
                    props={{
                      blockHeight: message.block_height
                    }}
                    />ago
                </div>
              </div>
            </Message>
          </>
        )
      })
    }
    </Messages>
  </Bg>
);