"use client"

import * as React from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {useEffect} from "react";
import {listCategories} from "@/lib/api";

export default function CategoriesComboBox() {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const [categories, setCategories] = React.useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                const tokenCookie = document.cookie
                    .split(";")
                    .find((cookie) => cookie.includes("token"))
                    .split("=")[1];
                const data = await listCategories(tokenCookie)
                if (data == null) {
                    return
                }

                const mappedCategories = data.map((category) => ({
                    label: category.name,
                    value: category.name
                }));

                setCategories(mappedCategories);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        }
        fetchData();
    }, []);

    function handleChangeCategory(value) {
        setValue(value)
        document.cookie = `category=${value}; path=/`;
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {value
                        ? categories.find((framework) => framework.value === value)?.label
                        : "Select category..."}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search categories..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>No categories found...</CommandEmpty>
                        <CommandGroup>
                            {categories.map((category) => (
                                <CommandItem
                                    key={category.value}
                                    value={category.value}
                                    onSelect={(currentValue) => {
                                        handleChangeCategory(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    {category.label}
                                    <CheckIcon
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            value === category.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
