/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, FieldValues } from "react-hook-form"
import { FormField } from "../ui/form"




interface IInputProps {
    form?: Control<FieldValues, any, FieldValues> | undefined
}
const InputCustom:React.FC<IInputProps> = ({form})=> {
    return (
        <FormField
            control={form}
            name="username"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                        <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                        This is your public display name.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default InputCustom