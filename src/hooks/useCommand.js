const useCache = require("./useCache")

const useCommand = () => {
  const {
    setToCache,
    getFromCache,
    deleteFromCache,
    existsInCache,
    expireCache,
    keysCache,
  } = useCache();

  const responseToCommand = async (command) => {
    let commandString = command.toString();
    try {
      commandString = commandString
        .split(/(\s+)/)
        .filter((s) => s.trim().length > 0);

      let [action, key, firstValue, secondValue, ...others] = commandString;
      const actionCommand = action.toUpperCase();

      function isValidCommand(actionCommand) {
        return (
          actionCommand === "SET" ||
          actionCommand === "GET" ||
          actionCommand === "DEL" ||
          actionCommand === "EXISTS" ||
          actionCommand === "EXPIRE" ||
          actionCommand === "KEYS"
        );
      }

      if (isValidCommand(actionCommand)) {
        switch (actionCommand) {
          case "SET":
            return await setToCache(key, firstValue, secondValue);
          case "GET":
            return await getFromCache(key, firstValue, secondValue, others);
          case "DEL":
            return await deleteFromCache(key);
          case "EXISTS":
            return await existsInCache(key);
          case "EXPIRE":
            return await expireCache(key, firstValue);
          case "KEYS":
            return await keysCache(key, firstValue);
          default:
            console.log("write somthing");
        }
      } else {
        throw new Error(`'${actionCommand}' is not a Redis command `);
      }
    } catch (e) {
      if (command.length === 0) {
        return null;
      } else {
        return e.toString();
      }
    }
  };

  return { responseToCommand };
};

export default useCommand;
