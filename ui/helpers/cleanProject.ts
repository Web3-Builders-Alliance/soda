import { ask } from '@tauri-apps/api/dialog';

const cleanProject = (setVersion: Function, setName: Function, setInstructions: Function, setAccounts: Function, setTypes: Function, setEvents: Function, setErrors: Function, setMetadata: Function) => {
    return async () => {
      const confirm = await ask('Are you sure?', 'This will close your previus project');
      if (!confirm)
        return;
      setVersion("0.1.0");
      setName("Project's Name");
      setInstructions([
        {
          name: "initialize",
        },
      ]);
      setAccounts([]);
      setTypes([]);
      setEvents([]);
      setErrors([]);
      setMetadata(undefined);
    };
  }
  
export default cleanProject;