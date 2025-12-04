import { Button } from "@/components/ui/button";
import * as m from "@/paraglide/messages";
import Image from "@tiptap/extension-image";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "./editor.css";
import api from "@/utils/api";
import FileHandler from "@tiptap/extension-file-handler";
import {
	Bold,
	Image as ImageIcon,
	Italic,
	Loader2,
	Strikethrough,
} from "lucide-react";
import { useEffect, useState } from "react";
interface EditorProps {
	value: string;
	onChange: (value: string) => void;
	editable?: boolean;
	teamId: string;
	retroId: string;
}

const sendImage = async (
	image: File,
	teamId: string,
	retroId: string,
): Promise<{ imageUrl: string }> => {
	const formData = new FormData();
	formData.append("image", image);

	return api<{ imageUrl: string }>(
		`api/teams/${teamId}}/retros/${retroId}/notes/image`,
		{
			method: "POST",
			headers: { Accept: "application/json" },
			body: formData,
		},
	);
};

export function Editor({
	value,
	onChange,
	editable = true,
	autoFocus,
	teamId,
	retroId,
}: EditorProps & { autoFocus?: boolean }) {
	const [isUploading, setIsLoading] = useState(false);

	const editor = useEditor({
		extensions: [
			StarterKit,
			Image,
			FileHandler.configure({
				allowedMimeTypes: [
					"image/png",
					"image/jpeg",
					"image/gif",
					"image/webp",
				],
				onDrop: (currentEditor, files, pos) => {
					files.forEach(async (file) => {
						setIsLoading(true);
						const resp = await sendImage(file, teamId, retroId);

						currentEditor
							.chain()
							.insertContentAt(pos, {
								type: "image",
								attrs: {
									src: resp.imageUrl,
								},
							})
							.insertContentAt(pos, " ")
							.focus()
							.run();
						setIsLoading(false);
					});
				},
				onPaste: (currentEditor, files, htmlContent) => {
					files.forEach(async (file) => {
						if (htmlContent) {
							return false;
						}
						setIsLoading(true);
						const resp = await sendImage(file, teamId, retroId);

						currentEditor
							.chain()
							.insertContentAt(currentEditor.state.selection.anchor, {
								type: "image",
								attrs: {
									src: resp.imageUrl,
								},
							})
							.insertContentAt(currentEditor.state.selection.anchor, " ")
							.focus()
							.run();

						setIsLoading(false);
					});
				},
			}),
		],
		content: value,
		editable,
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML());
		},
	});

	useEffect(() => {
		if (autoFocus && editor) {
			editor.commands.focus("end");
		}
	}, [autoFocus, editor]);

	return (
		<div className="border rounded-md bg-background">
			<div className="flex items-center gap-2 border-b p-2 bg-muted rounded-t-md">
				{/* Toolbar */}
				<Button
					type="button"
					size="icon"
					variant={editor?.isActive("bold") ? "default" : "outline"}
					onClick={() => editor?.chain().focus().toggleBold().run()}
					className="px-2"
					title={m.editor_bold()}
					aria-label={m.editor_bold()}
				>
					<Bold />
				</Button>
				<Button
					type="button"
					size="icon"
					variant={editor?.isActive("italic") ? "default" : "outline"}
					onClick={() => editor?.chain().focus().toggleItalic().run()}
					className="px-2"
					title={m.editor_italic()}
					aria-label={m.editor_italic()}
				>
					<Italic />
				</Button>
				<Button
					type="button"
					size="icon"
					variant={editor?.isActive("strike") ? "default" : "outline"}
					onClick={() => editor?.chain().focus().toggleStrike().run()}
					className="px-2"
					title={m.editor_strike()}
					aria-label={m.editor_strike()}
				>
					<Strikethrough />
				</Button>
				<Button
					type="button"
					size="icon"
					variant={"outline"}
					onClick={() => {
						const url = window.prompt(m.editor_image_url_prompt());
						if (url) editor?.chain().focus().setImage({ src: url }).run();
					}}
					className="px-2"
					title={m.editor_image()}
					aria-label={m.editor_image()}
				>
					<ImageIcon />
				</Button>

				{isUploading && <Loader2 size={16} className="animate-spin" />}
			</div>
			<EditorContent
				editor={editor}
				className="p-2 min-h-[100px] focus:outline-none"
			/>
		</div>
	);
}
